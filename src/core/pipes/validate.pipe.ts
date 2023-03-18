import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        console.log(e.getResponse());
        throw new UnprocessableEntityException(
          this.handleError((e.getResponse() as any).message),
        );
      }
    }
  }

  private handleError(errors) {
    return errors;
  }
}
