import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User {
    @ApiProperty({ type: String, description: 'The unique identifier of the user' })
    _id?: string;

    @ApiProperty({ uniqueItems: true, required: true, description: 'The email of the user' })
    @Prop({ unique: true, required: true })
    email: string;

    @ApiProperty({ required: true, description: 'The name of the user' })
    @Prop({ required: true })
    name: string;

    @ApiProperty({ minLength: 6, required: true, description: 'The password of the user' })
    @Prop({ minlength: 6, required: true })
    password?: string;

    @ApiProperty({ default: true, description: 'The active status of the user' })
    @Prop({ default: true })
    isActive: boolean;

    @ApiProperty({ type: [String], default: ['user'], description: 'The roles of the user' })
    @Prop({ type: [String], default: ['user'] })
    roles: string[];

}


export const UserSchema = SchemaFactory.createForClass( User );
