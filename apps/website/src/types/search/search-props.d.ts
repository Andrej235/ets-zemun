declare global {
  type SearchKey = {
    id: string;
    title: string;
    keywords: SearchKeyKeywords;
    url: string;
  };

  type SearchKeyKeywords = [string, ...string[]];

  namespace JSX {
    interface IntrinsicAttributes {
      searchKey?: SearchKey;
    }
  }

  namespace React {
    interface HTMLAttributes {
      searchKey?: SearchKey;
    }
  }
}

export {};

