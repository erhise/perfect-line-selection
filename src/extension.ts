import {
		commands,
		ExtensionContext,
    Position,
    Selection,
    window,
} from 'vscode';

export function activate(context: ExtensionContext) {

	const disposable = commands.registerCommand('extension.selectPerfectLine', () => {
		
		const { activeTextEditor } = window;

		if (activeTextEditor !== undefined) {
			const { lineNumber, firstNonWhitespaceCharacterIndex, range, range: { isSingleLine } } = activeTextEditor.document.lineAt(activeTextEditor.selection.start.line);

			activeTextEditor.selection = new Selection(
				new Position(lineNumber, firstNonWhitespaceCharacterIndex),
				range.end
			);

			if (isSingleLine === false) {
				window.showWarningMessage(
					`You selected multiple lines - but don't worry - only the first line was selected.`
				);
			}
			
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
