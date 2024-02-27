export interface FetchEventsResponse {
    events: any[];
    nextContinuation: string | null;
  }
  

  export interface Event {
    event: {
      kind: string;
      createdAt: string;
    };
    order: {
      contract: string;
      criteria: {
        data: {
          token: {
            tokenId: string;
          };
        };
      };
      price: {
        amount: {
          native: number;
        };
      };
      maker: string;
      validFrom: string;
      validTo: string;
    };
  }