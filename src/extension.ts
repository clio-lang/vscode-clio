import * as vscode from 'vscode';
import { LanguageClient, LanguageClientOptions, RevealOutputChannelOn, ServerOptions, TransportKind } from 'vscode-languageclient/node';

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('clio');

    if (config.get('languageServer.enabled')) {
        const serverOptions: ServerOptions = {
            command: config.get('languageServer.command'),
            transport: TransportKind.stdio,
            options: {
                shell: true,
                cwd: config.get('languageServer.cwd') || null
            }
        };
        const clientOptions: LanguageClientOptions = {
            documentSelector: [
                { language: 'clio', scheme: 'file' }
            ],
            outputChannelName: 'Clio',
            revealOutputChannelOn: RevealOutputChannelOn.Never
        };
        const client = new LanguageClient('Clio', serverOptions, clientOptions);

        context.subscriptions.push(client.start());
    }
}
