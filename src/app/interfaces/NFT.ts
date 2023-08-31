export interface INFTInfo {
  ID: string;
  name: string;
  tokenID: string;
  uri: string;
}

export interface INFTInfoDetail {
  ID: string;
  name: string;
  collectionName: string;
  description: string;
  image: string;
  error?: string;
}

export interface INFTSpecs {
  width: number;
  height: number;
  displayValue: string;
}
