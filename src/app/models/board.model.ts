export interface Board {
  background: string;
  bg_type: BgType;
  bid: string;
  title: string;
  user_id: string;
}

export enum BgType {
  Color = 'color',
  Image = 'image',
}

export interface BoardResponse {
  board: Board;
}
