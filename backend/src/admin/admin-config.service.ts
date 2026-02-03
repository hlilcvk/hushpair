import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService as NestConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class AdminConfigService {
  private readonly ENCRYPTION_KEY: Buffer;
  private readonly ALGORITHM = 'aes-256-cbc';

  constructor(
    private prisma: PrismaService,
    private configService: NestConfigService,
  ) {
    const key = this.configService.get('ENCRYPTION_KEY');
    this.ENCRYPTION_KEY = Buffer.from(key, 'utf-8').slice(0, 32);
  }

  /**
   * Encrypt sensitive API keys before storing
   */
  private encrypt(text: string): string {
    if (!text) return null;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.ALGORITHM, this.ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
  }

  /**
   * Decrypt sensitive API keys when retrieving
   */
  private decrypt(text: string): string {
    if (!text) return null;
    const parts = text.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const decipher = crypto.createDecipheriv(this.ALGORITHM, this.ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  /**
   * Get system configuration (without decrypted keys for security)
   */
  async getConfig() {
    let config = await this.prisma.systemConfig.findUnique({
      where: { id: 'system' },
    });

    if (!config) {
      // Initialize default config
      config = await this.prisma.systemConfig.create({
        data: { id: 'system' },
      });
    }

    // Return config with masked keys
    return {
      ...config,
      facetecKey: config.facetecKey ? '••••••••' : null,
      googleMapsKey: config.googleMapsKey ? '••••••••' : null,
      twilioSid: config.twilioSid ? '••••••••' : null,
      twilioToken: config.twilioToken ? '••••••••' : null,
      fcmServerKey: config.fcmServerKey ? '••••••••' : null,
      stripeSecretKey: config.stripeSecretKey ? '••••••••' : null,
      s3AccessKey: config.s3AccessKey ? '••••••••' : null,
      s3SecretKey: config.s3SecretKey ? '••••••••' : null,
    };
  }

  /**
   * Update API key (with encryption)
   */
  async updateApiKey(key: string, value: string, adminId: string) {
    const encrypted = this.encrypt(value);

    await this.prisma.systemConfig.update({
      where: { id: 'system' },
      data: { [key]: encrypted },
    });

    // Audit log
    await this.logAction(adminId, 'update_api_key', { key });

    return { success: true };
  }

  /**
   * Get decrypted API key (for internal service use only)
   */
  async getDecryptedKey(key: string): Promise<string | null> {
    const config = await this.prisma.systemConfig.findUnique({
      where: { id: 'system' },
    });

    const encrypted = config?.[key];
    return encrypted ? this.decrypt(encrypted) : null;
  }

  /**
   * Toggle feature on/off
   */
  async toggleFeature(feature: string, enabled: boolean, adminId: string) {
    await this.prisma.systemConfig.update({
      where: { id: 'system' },
      data: { [feature]: enabled },
    });

    await this.logAction(adminId, 'toggle_feature', { feature, enabled });

    return { success: true };
  }

  /**
   * Update app limit/configuration
   */
  async updateAppLimit(limit: string, value: number, adminId: string) {
    await this.prisma.systemConfig.update({
      where: { id: 'system' },
      data: { [limit]: value },
    });

    await this.logAction(adminId, 'update_limit', { limit, value });

    return { success: true };
  }

  /**
   * Update provider selection
   */
  async updateProvider(provider: string, value: string, adminId: string) {
    await this.prisma.systemConfig.update({
      where: { id: 'system' },
      data: { [provider]: value },
    });

    await this.logAction(adminId, 'update_provider', { provider, value });

    return { success: true };
  }

  /**
   * Create audit log entry
   */
  private async logAction(adminId: string, action: string, details: any) {
    await this.prisma.auditLog.create({
      data: {
        adminId,
        action,
        details,
      },
    });
  }

  /**
   * Get audit logs with pagination
   */
  async getAuditLogs(page: number = 1, limit: number = 50) {
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          admin: {
            select: {
              name: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      this.prisma.auditLog.count(),
    ]);

    return {
      logs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
