export interface Board {
  bid: string;
  user_id: string;
  title: string;
  bg_type: BgType;
  background: string;
}

export enum BgType {
  Color = 'color',
  Image = 'image',
}
