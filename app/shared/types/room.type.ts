export type Room = {
  id?: number;
  time?: number;
  started?: boolean;
  initTime?: string;
};

// model Room {
//   id Int @id @default(autoincrement())
//   started Boolean @default(false)
//   initTime Int? //
//   time Int? // milisegundo
//   user User[]
//   guest Guest[]
// }
