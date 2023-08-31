export class HelperMethods {
  public static validateURL(url: string): string {
    if (url.startsWith('unsafe') || url.startsWith('data'))
      throw new Error('Invalid url: ' + url);

    if (url.startsWith('ipfs')) {
      return (
        'https://ipfs.moralis.io:2053/ipfs/' + url.split('ipfs://').slice(-1)
      );
    } else {
      return url;
    }
  }
}
