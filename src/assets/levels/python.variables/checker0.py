from checklib import start, end, write_json
import sys

start()

my_age = globals().get("мой_возраст", None)
my_name = globals().get("мое_имя", None)

if my_age is None:
    print("Похоже, что ты пока еще не объявил переменную `мой_возраст`", file=sys.stderr)
elif not isinstance(my_age, int):
    print("Похоже, что переменная `мой_возраст` не является числом", file=sys.stderr)
elif my_name is None:
    print("Похоже, что ты пока еще не объявил переменную `мое_имя`", file=sys.stderr)
elif not isinstance(my_name, str):
    print("Похоже, что переменная `мое_имя` не является текстом", file=sys.stderr)
else:
    write_json({
        "my_age": my_age,
        "my_name": my_name,
    })
    print(f"Тебе {my_age} лет и тебя зовут \"{my_name}\"! Можешь продолжать")
end()
