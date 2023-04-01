export type CommentaryEvent = "mountainBlock" | "movementRunsOut";

export enum CommentaryEvents {
  mountainBlock = "mountainBlock",
  movementRunsOut = "movementRunsOut",
}

interface Commentary {
  key: CommentaryEvent;
  quotes: string[];
}

class CommentaryManager {
  readonly #commentaries: Commentary[] = [
    {
      key: CommentaryEvents.mountainBlock,
      quotes: ["Can't go that way.", "Can't climb that."],
    },
    {
      key: CommentaryEvents.movementRunsOut,
      quotes: ["Need to rest."],
    },
  ];

  public selectQuote(event: CommentaryEvent): string {
    const commentary = this.#commentaries.find(
      (commentary: Commentary) => commentary.key === event
    );

    if (commentary) {
      return commentary.quotes[
        Math.floor(Math.random() * commentary.quotes.length)
      ];
    }

    return "...";
  }
}

export default CommentaryManager;
