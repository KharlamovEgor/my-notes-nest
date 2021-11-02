import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop()
  title: string;

  @Prop()
  body: string;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
