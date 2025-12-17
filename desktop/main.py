import sys
import os
import signal
import subprocess

from PySide6.QtWidgets import QApplication
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtCore import QUrl

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_BUILD = os.path.join(BASE_DIR, "..", "frontend", "build", "index.html")
BACKEND_DIR = os.path.join(BASE_DIR, "..", "backend")

# -------------------------------
# Start Backend (Node.js)
# -------------------------------
backend_process = subprocess.Popen(
    ["node", "index.js"],
    cwd=BACKEND_DIR,
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL,
    shell=True
)

# -------------------------------
# Qt App
# -------------------------------
app = QApplication(sys.argv)
view = QWebEngineView()

if not os.path.exists(FRONTEND_BUILD):
    raise FileNotFoundError(f"index.html not found at {FRONTEND_BUILD}")

view.load(QUrl.fromLocalFile(FRONTEND_BUILD))
view.setWindowTitle("Login Upload Dashboard App")
view.resize(1200, 800)
view.show()

# -------------------------------
# Graceful Shutdown on Ctrl+C
# -------------------------------
def handle_exit(signum, frame):
    print("Closing application...")
    try:
        backend_process.terminate()
    except:
        pass
    app.quit()
    sys.exit(0)

signal.signal(signal.SIGINT, handle_exit)
signal.signal(signal.SIGTERM, handle_exit)

# -------------------------------
# Also close backend if window closed
# -------------------------------
def on_window_closed():
    try:
        backend_process.terminate()
    except:
        pass
    app.quit()

app.aboutToQuit.connect(on_window_closed)

# -------------------------------
# Run
# -------------------------------
sys.exit(app.exec())
