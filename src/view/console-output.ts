
const MoveCaretUp = () => process.stdout.write('\u001b[F');
const WriteLine = (text: string) => console.log(text);

class ConsoleOutput {

    // Store how many lines was written last time, so we can ensure they are cleared before writing again.
    private PreviousOutputLines = 0;

    public WriteLines(lines: string[]): void {
        this.EraseLines(this.PreviousOutputLines);
        this.PrintLines(lines);
    }

    private PrintLines(lines: string[]): void {
        for (const line of lines) {
            console.log(line);
        }
        this.PreviousOutputLines = lines.length;
    }

    private EraseLines(count: number): void {
        for (let i = 0; i < count; i++) {
            MoveCaretUp();
        }

        const width = process.stdout.columns;
        for (let i = 0; i < count; i++) {
            WriteLine(new Array(width + 1).join(' '));
        }

        for (let i = 0; i < count; i++) {
            MoveCaretUp();
        }
    }
}

export const consoleOutput = new ConsoleOutput();
