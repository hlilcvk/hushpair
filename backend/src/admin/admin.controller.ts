import { Controller, Get, Post, Put, Body, Query, UseGuards, Req } from '@nestjs/common';
import { AdminConfigService } from './admin-config.service';
import { PrismaService } from '../prisma/prisma.service';

// NOTE: Add proper auth guards in production
// @UseGuards(AdminAuthGuard, TwoFactorGuard)

@Controller('admin')
export class AdminController {
  constructor(
    private configService: AdminConfigService,
    private prisma: PrismaService,
  ) {}

  // ============================================
  // CONFIGURATION ENDPOINTS
  // ============================================

  @Get('config')
  async getConfig() {
    return this.configService.getConfig();
  }

  @Post('config/api-key')
  async updateApiKey(
    @Body() body: { key: string; value: string },
    @Req() req: any,
  ) {
    // TODO: Extract admin ID from JWT token
    const adminId = 'temp-admin-id';
    return this.configService.updateApiKey(body.key, body.value, adminId);
  }

  @Put('config/feature-toggle')
  async toggleFeature(
    @Body() body: { feature: string; enabled: boolean },
    @Req() req: any,
  ) {
    const adminId = 'temp-admin-id';
    return this.configService.toggleFeature(body.feature, body.enabled, adminId);
  }

  @Put('config/app-limit')
  async updateAppLimit(
    @Body() body: { limit: string; value: number },
    @Req() req: any,
  ) {
    const adminId = 'temp-admin-id';
    return this.configService.updateAppLimit(body.limit, body.value, adminId);
  }

  @Put('config/provider')
  async updateProvider(
    @Body() body: { provider: string; value: string },
    @Req() req: any,
  ) {
    const adminId = 'temp-admin-id';
    return this.configService.updateProvider(body.provider, body.value, adminId);
  }

  // ============================================
  // USER MANAGEMENT
  // ============================================

  @Get('users')
  async listUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
    @Query('room') room?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};

    if (room) where.currentRoom = room;
    if (status) where.accountStatus = status;
    if (search) {
      where.OR = [
        { realName: { contains: search, mode: 'insensitive' } },
        { redAlias: { contains: search, mode: 'insensitive' } },
        { phoneNumber: { contains: search } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          realName: true,
          redAlias: true,
          phoneNumber: true,
          currentRoom: true,
          accountStatus: true,
          isVerified: true,
          trustScore: true,
          createdAt: true,
          lastActiveAt: true,
          profilePhoto: true,
          redBlurredPhoto: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
    };
  }

  @Get('users/:id')
  async getUserDetails(@Query('id') id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        matchesAsUserOne: {
          include: {
            userTwo: {
              select: {
                id: true,
                realName: true,
                redAlias: true,
                profilePhoto: true,
              },
            },
          },
        },
        matchesAsUserTwo: {
          include: {
            userOne: {
              select: {
                id: true,
                realName: true,
                redAlias: true,
                profilePhoto: true,
              },
            },
          },
        },
        reportedBy: true,
        reports: true,
        subscriptions: true,
      },
    });

    return user;
  }

  @Put('users/:id/trust-score')
  async updateTrustScore(
    @Query('id') id: string,
    @Body() body: { score: number; reason: string },
    @Req() req: any,
  ) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { trustScore: body.score },
    });

    const adminId = 'temp-admin-id';
    await this.configService['logAction'](adminId, 'update_trust_score', {
      userId: id,
      newScore: body.score,
      reason: body.reason,
    });

    return user;
  }

  @Put('users/:id/status')
  async updateUserStatus(
    @Query('id') id: string,
    @Body() body: { status: string; reason: string },
    @Req() req: any,
  ) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { accountStatus: body.status as any },
    });

    const adminId = 'temp-admin-id';
    await this.configService['logAction'](adminId, 'update_user_status', {
      userId: id,
      newStatus: body.status,
      reason: body.reason,
    });

    return user;
  }

  // ============================================
  // STATISTICS & DASHBOARD
  // ============================================

  @Get('stats/overview')
  async getOverviewStats() {
    const [
      totalUsers,
      activeUsers,
      greenRoomUsers,
      redRoomUsers,
      totalMatches,
      validatedMatches,
      totalMessages,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({
        where: {
          accountStatus: 'ACTIVE',
          lastActiveAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24h
          },
        },
      }),
      this.prisma.user.count({ where: { currentRoom: 'GREEN' } }),
      this.prisma.user.count({ where: { currentRoom: 'RED' } }),
      this.prisma.match.count({ where: { deletedAt: null } }),
      this.prisma.match.count({ where: { isValidated: true, deletedAt: null } }),
      this.prisma.message.count({ where: { isDeleted: false } }),
    ]);

    return {
      totalUsers,
      activeUsers,
      greenRoomUsers,
      redRoomUsers,
      totalMatches,
      validatedMatches,
      totalMessages,
      averageTrustScore: await this.getAverageTrustScore(),
    };
  }

  private async getAverageTrustScore(): Promise<number> {
    const result = await this.prisma.user.aggregate({
      _avg: { trustScore: true },
    });
    return Math.round(result._avg.trustScore || 0);
  }

  @Get('stats/activity')
  async getActivityStats(@Query('days') days: string = '7') {
    const daysNum = parseInt(days);
    const startDate = new Date(Date.now() - daysNum * 24 * 60 * 60 * 1000);

    const newUsers = await this.prisma.user.count({
      where: { createdAt: { gte: startDate } },
    });

    const newMatches = await this.prisma.match.count({
      where: { createdAt: { gte: startDate } },
    });

    const newMessages = await this.prisma.message.count({
      where: { sentAt: { gte: startDate } },
    });

    return {
      period: `Last ${daysNum} days`,
      newUsers,
      newMatches,
      newMessages,
    };
  }

  // ============================================
  // AUDIT LOGS
  // ============================================

  @Get('audit-logs')
  async getAuditLogs(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '50',
  ) {
    return this.configService.getAuditLogs(parseInt(page), parseInt(limit));
  }

  // ============================================
  // LEGAL EXPORT (Requires 2FA in production)
  // ============================================

  @Post('export/chat')
  async exportChat(
    @Body() body: { matchId: string; reason: string },
    @Req() req: any,
  ) {
    const match = await this.prisma.match.findUnique({
      where: { id: body.matchId },
      include: {
        userOne: true,
        userTwo: true,
        messages: {
          orderBy: { sentAt: 'asc' },
          include: {
            sender: {
              select: {
                id: true,
                realName: true,
                redAlias: true,
                phoneNumber: true,
              },
            },
          },
        },
      },
    });

    if (!match) {
      throw new Error('Match not found');
    }

    // Log export action
    const adminId = 'temp-admin-id';
    await this.configService['logAction'](adminId, 'export_chat', {
      matchId: body.matchId,
      reason: body.reason,
      userOneId: match.userOneId,
      userTwoId: match.userTwoId,
    });

    // TODO: Generate PDF in production
    // For now, return JSON
    return {
      exportId: `EXPORT-${Date.now()}`,
      timestamp: new Date().toISOString(),
      reason: body.reason,
      match,
      messageCount: match.messages.length,
    };
  }
}
