import json
from typing import Any

class _ChkbufType:
    def write(self, write: str) -> None: ...


# Intrinsic variable
chkbuf: _ChkbufType


def start():
    print("[", end='', file=chkbuf)


def write_json(obj: dict[str, Any]):
    print(json.dumps(obj), file=chkbuf, end='')

def write_comma():
    print(',', end=' ')


def end():
    print("]", end='', file=chkbuf)
