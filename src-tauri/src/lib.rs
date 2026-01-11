// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use pyrunner::PyRunner;
use tauri::{Manager, State};
use std::sync::Mutex;

#[tauri::command(async)]
fn run_python_code(pyrunner: State<PyRunner>, code: &str) -> (String, String, String) {
    pyrunner.run_code(code)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(PyRunner::new())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![run_python_code])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
