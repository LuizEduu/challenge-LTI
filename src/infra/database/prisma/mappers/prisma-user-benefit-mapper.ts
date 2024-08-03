import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { UserBenefits } from '@/domain/RH/enterprise/entities/user-benefits';
import { Prisma, UserBenefits as PrismaUserBenefit } from '@prisma/client';

export class PrismaUserBenefitMapper {
  static toDomain(raw: PrismaUserBenefit): UserBenefits {
    return UserBenefits.create(
      {
        userId: new UniqueEntityID(raw.userId),
        benefitId: new UniqueEntityID(raw.benefitId),
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    userBenefit: UserBenefits,
  ): Prisma.UserBenefitsUncheckedCreateInput {
    return {
      id: userBenefit.id.toString(),
      benefitId: userBenefit.benefitId.toString(),
      userId: userBenefit.userId.toString(),
    };
  }
}
