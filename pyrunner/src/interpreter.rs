use std::{ffi::CString, sync::RwLock};

use pyo3::{IntoPyObjectExt, prelude::*, sync::RwLockExt, types::PyDict};

static PY_STDOUT: RwLock<String> = RwLock::new(String::new());
static PY_STDERR: RwLock<String> = RwLock::new(String::new());
static PY_CHKBUF: RwLock<String> = RwLock::new(String::new());

#[pyclass]
struct LoggingStdout;

#[pymethods]
impl LoggingStdout {
    fn write(&self, data: &str) {
        PY_STDOUT.write().unwrap().push_str(data);
    }
}

#[pyclass]
struct LoggingStderr;

#[pymethods]
impl LoggingStderr {
    fn write(&self, data: &str) {
        PY_STDERR.write().unwrap().push_str(data);
    }
}

#[pyclass]
struct LoggingChkbuf;

#[pymethods]
impl LoggingChkbuf {
    fn write(&self, data: &str) {
        PY_CHKBUF.write().unwrap().push_str(data);
    }
}

const PY_BOOTSTRAP: &str = include_str!("../assets/bootstrap.py");
const PY_ROBOT_SRC: &str = include_str!("../assets/modules/robot.py");
const PY_CHECKLIB_SRC: &str = include_str!("../assets/modules/checklib.py");

fn into_cstring(s: impl AsRef<str>) -> CString {
    CString::new(s.as_ref()).expect("found null character")
}
pub struct PyRunner {}

impl PyRunner {
    pub fn new() -> PyRunner {
        println!("pyrunner: bootstrapping...");
        Python::attach(|py| -> PyResult<()> {
            let locals = PyDict::new(py);
            locals.set_item("PY_ROBOT_SRC", PY_ROBOT_SRC)?;
            locals.set_item("PY_CHECKLIB_SRC", PY_CHECKLIB_SRC)?;

            let sys = py.import("sys")?;
            sys.setattr("stdout", LoggingStdout.into_py_any(py)?)?;
            sys.setattr("stderr", LoggingStderr.into_py_any(py)?)?;
            
            py.run(&into_cstring(PY_BOOTSTRAP), None, Some(&locals))?;

            let checklib = py.import("checklib")?;
            checklib.setattr("chkbuf", LoggingChkbuf.into_py_any(py)?)?;

            Ok(())
        }).expect("bootstrapping failed");
        println!("pyrunner: bootstrapping finished");
        PyRunner {}
    }

    pub fn run_code(&self, code: impl AsRef<str>) -> (String, String, String) {
        PY_STDOUT.write().unwrap().clear();
        PY_STDERR.write().unwrap().clear();
        PY_CHKBUF.write().unwrap().clear();

        Python::attach(|py| {
            let result = py.run(&into_cstring(code), Some(&PyDict::new(py)), None);
            if result.is_err() {
                result.unwrap_err().display(py);
            }
        });
        (PY_STDOUT.read().unwrap().clone(), PY_STDERR.read().unwrap().clone(), PY_CHKBUF.read().unwrap().clone())
    }
}