from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from extern import PY_CHECKLIB_SRC, PY_ROBOT_SRC


def register_module(name: str, code: str):
    """
    Registers and loads module from string code
    and make it importable via std syntax
    
    :param name: Module name
    :type name: str
    :param code: Module code
    :type code: str
    """

    import sys
    from types import ModuleType

    module = ModuleType(name)
    module.__file__ = f"<{name}>"
    exec(code, module.__dict__)

    sys.modules[name] = module

    print(f"python: Registered {name} module")


if __name__ == "__main__":
    register_module("checklib", PY_CHECKLIB_SRC)
    register_module("robot", PY_ROBOT_SRC)
