import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Benefit } from '@/domain/RH/enterprise/entities/benefit';
import { Prisma, Benefit as PrismaBenefit } from '@prisma/client';

export class PrismaBenefitMapper {
  static toDomain(raw: PrismaBenefit): Benefit {
    return Benefit.create(
      {
        name: raw.name,
        description: raw.description,
        value: raw.value,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(benefit: Benefit): Prisma.BenefitUncheckedCreateInput {
    return {
      id: benefit.id.toString(),
      name: benefit.name,
      description: benefit.description,
      value: benefit.value,
      createdAt: benefit.createdAt,
      updatedAt: benefit.updatedAt ?? undefined,
    };
  }
}
