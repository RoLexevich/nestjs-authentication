import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException} from'@nestjs/common';
import { ObjectSchema } from'joi';

@Injectable()
export class JoiValidationPipe implements  PipeTransform {
    constructor(private schema: ObjectSchema) {}
    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value);

        this.getError(error);
        return value;
    }

    private getError(error:any) {
        if (error) {
            throw new BadRequestException(`Validation error : ${error.details[0].message}`);
        }
    }
}