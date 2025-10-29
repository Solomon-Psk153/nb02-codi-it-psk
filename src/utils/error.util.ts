import { pgErrorResponseObjectType } from "@_types/error.type";
import { BadRequestError, ConflictError } from "@_errors/400.error";
import { appLogLevel } from "@_consts/app.consts";
import { AppError } from "@_errors/app.error";
import { InternalServerError, ServiceUnavailableError } from "@_errors/500.error";

const isPgError = (err: unknown): err is pgErrorResponseObjectType => {
  return typeof err === 'object' && err !== null && 'code' in err && typeof (err as any).code === 'string';
}

export const mapDBError = (err: unknown): AppError | undefined => {
  if(!isPgError(err)) return undefined;

  const errObj = appLogLevel === "debug" ? err : (err as any).message;
  switch((err as any).code) {
    case "23505": // unique_violation
      return new ConflictError(`이미 존재하는 값입니다. ${errObj}`);
    case "23503": // foreign_key_violation
      return new ConflictError(`참조 대상이 존재하지 않습니다. ${errObj}`);
    case "23502": // not_null_violation
      return new BadRequestError(`필수 값이 누락되었습니다. ${errObj}`);
    case "23514": // check_violation
      return new BadRequestError(`요청 값이 허용된 범위를 벗어났습니다. ${errObj}`);
    case "40P01": // deadlock_detected
      return new ServiceUnavailableError(`동시성 오류가 발생했습니다. 잠시 후 다시 시도해 주세요. ${errObj}`);
    case "40001": // serialization_failure
      return new ServiceUnavailableError(`요청을 처리하는 동안 동시성 충돌이 발생했습니다. 직렬화에 실패했습니다. 잠시 후 다시 시도하세요. ${errObj}`);
    case "42P01": // undefined_table
      return new InternalServerError(`서버 오류가 발생했습니다. ${errObj}`);
    case "42703": // undefined_column
      return new InternalServerError(`서버 오류가 발생했습니다. ${errObj}`);
    case "42601": // syntax_error
      return new InternalServerError(`서버 오류가 발생했습니다. ${errObj}`);
    case "42883": // undefined_function
      return new InternalServerError(`서버 오류가 발생했습니다. ${errObj}`);
    case "22001": // string_data_right_truncation
      return new BadRequestError(`문자열 길이 제한을 초과했습니다. ${errObj}`);
    case "22003": // numeric_value_out_of_range
      return new BadRequestError(`허용 가능한 숫자 범위를 초과했습니다. ${errObj}`);
    case "22P02": // invalid_text_representation
      return new BadRequestError(`값의 타입이 맞지 않습니다. ${errObj}`);
    case "53300": // too_many_connections
      return new ServiceUnavailableError(`DB 연결 수가 한도 초과되었습니다. ${errObj}`);
    case "57014": // query_canceled
      return new ServiceUnavailableError(`요청 처리 시간이 초과되었습니다. 쿼리를 최적화하거나 나중에 다시 시도하세요. ${errObj}`);
    case "42501": // insufficient_privilege
      return new InternalServerError(`서버 오류가 발생했습니다. ${errObj}`); // UnauthorizedError로 처리 가능
    case "23513": // check_violation? (less common)
      return new BadRequestError(`요청 값이 허용된 범위를 벗어났습니다. ${errObj}`);
    case "22012": // division_by_zero
      return new BadRequestError(`잘못된 연산입니다. ${errObj}`);
    case "42804": // datatype_mismatch
      return new BadRequestError(`잘못된 데이터 형식입니다. ${errObj}`);
    case "25P02": // in_failed_sql_transaction
      return new InternalServerError(`요청 처리 중 내부 오류가 발생했습니다. ${errObj}`);
    case "08003": // connection_does_not_exist
    case "08006": // connection_failure (class 08)
      return new InternalServerError(`내부 시스템 연결불가합니다. 잠시 후 다시 시도하세요. ${errObj}`);
    default:
      return undefined;
  }
};