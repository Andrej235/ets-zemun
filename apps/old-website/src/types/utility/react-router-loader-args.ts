export type LoaderArgs = {
  request: Request;
  params: {
    readonly [k: string]: string | undefined;
  };
  context?: unknown;
};
