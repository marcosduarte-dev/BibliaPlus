// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use zip_extensions::zip_extract;
use std::path::PathBuf;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![extraindo_zip])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn extraindo_zip(zip: String, output: String) -> bool {
    let path_zip = PathBuf::from(zip);
    let path_output = PathBuf::from(output);
    let _ = zip_extract(&path_zip, &path_output);

    return true;
}