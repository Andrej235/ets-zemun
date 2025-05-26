declare global {
  type SearchKey = {
    id: string;
    title: string;
    keywords: string;
    url: string;
  };

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
