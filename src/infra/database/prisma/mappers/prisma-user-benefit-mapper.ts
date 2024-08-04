import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { UserBenefits } from '@/domain/RH/enterprise/entities/user-benefits';
import { UserBenefitsWithBenefitsFields } from '@/domain/RH/enterprise/entities/value-objects/user-benefits-with-benefit-fields';
import { Prisma, UserBenefits as PrismaUserBenefit } from '@prisma/client';

type toDomainWithBenefitFields = {
  benefit: {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    value: number;
  };
} & {
  id: string;
  benefitId: string;
  userId: string;
};

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

  static toDomainWithBenefitFields(
    raw: toDomainWithBenefitFields,
  ): UserBenefitsWithBenefitsFields {
    return UserBenefitsWithBenefitsFields.create({
      benefitId: raw.benefitId,
      userId: raw.userId,
      value: raw.benefit.value,
    });
  }
}
