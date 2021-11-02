import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './schemas/note.schema';
import { Model } from 'mongoose';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  create(createNoteDto: CreateNoteDto) {
    const newNote = new this.noteModel(createNoteDto);
    return newNote.save();
  }

  findAll() {
    return this.noteModel.find().exec();
  }

  findOne(id: string) {
    return this.noteModel.findById(id).exec();
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.noteModel
      .findByIdAndUpdate(id, updateNoteDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.noteModel.findByIdAndDelete(id).exec();
  }
}
