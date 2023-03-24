export type CommentaryEvent = "mountain";

class CommentaryManager {
  private readonly _quotes = {
    mountain: ["Can't go that way.", "Can't climb that."],
  };

  public selectQuote(event: CommentaryEvent): string {
    const eventQuotes = this._quotes[event];

    return eventQuotes[Math.floor(Math.random() * eventQuotes.length)];
  }
}

export default CommentaryManager;
