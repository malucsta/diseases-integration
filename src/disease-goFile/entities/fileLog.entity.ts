import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'files' })
export class FileLogEntity {
  @PrimaryColumn({ type: 'date' })
  date: string;

  //in order to simplify, just stores how many files were exported
  @Column({ name: 'exported_files', type: 'int', nullable: false })
  exportedFiles: number;
}
