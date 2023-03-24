import { Op } from 'sequelize';
import { FindOptions } from 'sequelize';
import { User } from 'src/modules/users/user.entity';

export interface PaginationOptions {
  size: number;
  page: number;
}
export interface PaginatedData<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}
interface PaginationData {
  page: number;
  size: number;
  options: FindOptions;
}

export async function paginationBuilder(
  repository: any,
  { page, size, options: { where, ...rest } }: PaginationData,
): Promise<PaginatedData<any>> {
  const offset = (page - 1) * size;
  const limit = size;
  const compiledWhere = Object.keys(where).reduce((prev, current) => {
    const result = {
      ...prev,
      [current]:
        typeof where[current] === 'string'
          ? { [Op.substring]: where[current] }
          : where[current],
    };
    switch (where[current]) {
      case 'true':
      case 'false':
        result[current] = Boolean(where[current]);
        break;

      default:
        break;
    }
    return result;
  }, {});
  const { rows, count } = await repository.findAndCountAll({
    offset,
    limit,
    where: compiledWhere,
    ...rest,
  });
  const totalPages = Math.ceil(count / size);

  return {
    data: rows,
    meta: {
      currentPage: page,
      totalPages,
      itemsPerPage: Number(limit),
      totalItems: count,
    },
  };
}
