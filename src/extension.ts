'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as process from 'process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "minibex-vscode" is now active!');

    let runopt = vscode.commands.registerCommand('extension.runOpt', () => {
        let config = vscode.workspace.getConfiguration();
        var path = config.get("minibex.ibexOptimPath");
        if (path === "") {
            path = isFileInPath("ibexopt");
            if (path === "") {
                vscode.window.showErrorMessage(
                    `minibex.ibexOptimPath not defined.\n
                    Please indicate the path to the ibexopt binary, 
                    or include it in the PATH env variable.`);
                return;
            }
        } else {
            if (!fs.existsSync(String(path))) {
                vscode.window.showErrorMessage("Binary reference from minibex.ibexOptimPath does not exist.");
                return;
            }
        }
        let editor = vscode.window.activeTextEditor;
        if (editor === undefined) {
            vscode.window.showErrorMessage("Please open a Minibex file.");
            return;
        }
        editor.document.save();
        let term = vscode.window.createTerminal();
        let file = editor.document.fileName;
        let eps = config.get("minibex.optGoalEps");
        term.sendText(path + " --rel-eps-f=" + eps + " --abs-eps-f=" + eps + " " + file);
        term.show();
    });

    let runsolve = vscode.commands.registerCommand('extension.runSolve', () => {
        let config = vscode.workspace.getConfiguration();
        var path = config.get("minibex.ibexSolverPath");
        if (path === "") {
            path = isFileInPath("ibexsolve");
            if (path === "") {
                vscode.window.showErrorMessage(
                    `minibex.ibexSolverPath not defined.\n
                    Please indicate the path to the ibexsolve binary, 
                    or include it in the PATH env variable.`);
                return;
            }
        } else {
            if (!fs.existsSync(String(path))) {
                vscode.window.showErrorMessage("Binary reference from minibex.ibexSolverPath does not exist.");
                return;
            }
        }
        let editor = vscode.window.activeTextEditor;
        if (editor === undefined) {
            // Should not happen
            vscode.window.showErrorMessage("Please open a Minibex file.");
            return;
        }
        editor.document.save();
        let term = vscode.window.createTerminal();
        let file = editor.document.fileName;
        let eps = config.get("minibex.solverMinEps");
        term.sendText(path + " --eps-min=" + eps + " " + file);
        term.show();
    });

    context.subscriptions.push(runopt);
    context.subscriptions.push(runsolve);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function isFileInPath(file: String) {
    let pathEnv = String(process.env['PATH']);
    let pathFolders = pathEnv.split(":");
    for (let folder of pathFolders) {
        let path = folder + "/" + file;
        if (fs.existsSync(path)) {
            return path;
        }
    }
    return "";
}