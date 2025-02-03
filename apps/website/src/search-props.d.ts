declare global {
  type SearchKey = {
    title: string;
    keywords: SearchKeyKeywords;
  };

  type SearchKeyKeywords = string | [string, ...string[]];

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

