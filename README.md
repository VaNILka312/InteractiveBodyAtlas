# InteractiveBodyAtlas

## Запуск

Нужно открыть проект через HTTP-сервер (GLB нельзя корректно загрузить просто двойным кликом по `index.html`).

Важно: в Windows `python -m http.server` иногда отдаёт `.js` как `text/plain`, и браузер блокирует ES-модули. Поэтому используйте `server.py` из этого репозитория.

Пример:

```bash
python server.py
```

Откройте `http://127.0.0.1:5173/`.

## API библиотеки сцены

После загрузки страницы экземпляр библиотеки доступен как `window.Atlas`.

Состояние по умолчанию: **все элементы скрыты**.

### Основные функции (то, что пишет конечный пользователь)

```js
Atlas.showElement('SomeMeshName')
Atlas.hideElement('SomeMeshName')

Atlas.showGroup('bones')
Atlas.hideGroup('bones')

Atlas.hideAll()
Atlas.showAll()

Atlas.apply({
  includeGroups: ['bones', 'muscles'],
  excludeGroups: ['auxiliary'],
  includeElements: [],
  excludeElements: [],
  reset: true
})
```

### Как узнать, что доступно (группы/элементы)

```js
Atlas.getGroupNames()
Atlas.getElementIds()
Atlas.getElementIdsByName('ExactMeshName')
Atlas.getManifest()
```

### Команды для групп (создание/редактирование)

Создать новую группу (пустую):

```js
Atlas.createGroup('myGroup')
```

Добавить элементы в группу (по `id` или по `name` из GLB):

```js
Atlas.addToGroup('myGroup', 'Cube')
Atlas.addToGroup('myGroup', ['Cube', 'Cone'])
```

Удалить элементы из группы:

```js
Atlas.removeFromGroup('myGroup', 'Cube')
Atlas.removeFromGroup('myGroup', ['Cube', 'Cone'])
```

Посмотреть, кто входит в группу:

```js
Atlas.getGroupMembers('myGroup')
```

Удалить группу (удаляется только “ручная” группа, созданная через `createGroup`):

```js
Atlas.deleteGroup('myGroup')
```

## Типовые сценарии

### Показать несколько групп и “вычесть” одну группу

```js
Atlas.apply({
  includeGroups: ['bones', 'muscles', 'nerves'],
  excludeGroups: ['auxiliary'],
  reset: true
})
```

### Показать конкретный элемент по имени из GLB

```js
Atlas.showElement('Humerus_L')
```

Если в GLB несколько мешей с одинаковым `name`, `showElement('Name')` покажет все совпадения. Чтобы управлять ими поштучно, используйте `id` из `Atlas.getElementIds()` или `Atlas.getManifest()`.

### Полностью сбросить видимость

```js
Atlas.hideAll()
```