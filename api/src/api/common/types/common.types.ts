export type ActionResult = {
  success: boolean;
  message: string;
  errorCode?: number;
};

export interface ImageRef {
  imageUrl: string;
  remoteUrl: string;
  expiry: number;
}
