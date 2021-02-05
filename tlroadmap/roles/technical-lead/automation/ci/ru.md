# Continuous Integration
## Описание
CI (Continuous Integration или Непрерывная интеграция) – это автоматическая сборка программного обеспечения и его тестирование на работоспособность.

## Почему ветка важна?
- Настроенный CI помогает быстрее доносить изменения кода на сервера.
- Тестировщики могут сразу узнавать в какой момент развернулась новая версия и приступать к её тестированию.
- Запуск автотестов в окружении приближенном к боевому.
- Гарантия стабильности основной ветки разработки. Это даёт возможность спокойного создания новых фич и релиз веток.
- Непрерывная интеграция означает, что мы на каждый коммит нашей ветки понимаем готовность нашей ветки сливаться в trunk.


## Что будет если не настроить CI?
- Увеличивается время на тестирование
- Увеличивается время на сборку и развёртывание ПО, так как это происходит вручную
- Отнимает время команды на ту самую сборку и развёртывание, когда команда бы могла заниматься в это время исправлением багов или написанием новых фич.
- Возможно придётся изменять статусы тасок вручную


## На кого может быть делегирована?
- Тимлид ниже уровнем
- DevOps - специалист
- Разработчик

## Примеры поведения
### Примеры плохого поведения
- Демонстрация заказчику без тестирования, так как у команды не было времени на ручное развёртывание кода или не было ответственного за это
- Программист во время разработки проверяет только локально, после выкатки на прод., он ломается. А разработчик говорит: "У меня локально то все работает". Как итог, недовольные клиенты и заказчик. Решение: иметь два окружения с настроенным CI, одно для разработчиков, другое для тестировщиков.
- Автотесты проходят на локальном окружении, а на серверах падают
- Нет возможности быстро откатывать прод. к старой, рабочей версии

### Примеры хорошего поведения
- В компании настроен стандартный процесс по настройке СI (есть стандартные конфигурации)
- В компании настроены системы для автоматического развёртывания (например: Jenkins, Kubernetes)
- Настроены оповещения о начале сборки и её окончании, удобным для команды способом (например: оповещения в чат telegram)
- Используемый task manager интегрирован в CI, что помогает автоматически менять статусы у задач
- Версионность билдов
- Настроена возможность создавать ветки релиза из протестированного билда

## Способы прокачки
### Практика
- Чтобы отработать навыки по настройке CI, вы можете на своём компьютере развернуть VM или Vagrant настроить как сервер, и попробовать самостоятельно установить необходимую систему для развёртывания и настроить её.
- Попросить у команды или у руководства возможность, настроить CI для следующего стартующего проекта
- Пройти различные курсы, например:
  1. [Learn DevOps: CI/CD with Jenkins using Pipelines and Docker](https://www.udemy.com/course/learn-devops-ci-cd-with-jenkins-using-pipelines-and-docker/)
  2. [DevOps: CI/CD with Jenkins pipelines, Maven, Gradle](https://www.udemy.com/course/devops-and-continuous-integration-with-jenkins-pipelines/)
  3. [DevOps Project: CI/CD with Jenkins Ansible Docker Kubernetes](https://www.udemy.com/course/valaxy-devops/)
  4. [Docker and Kubernetes: The Complete Guide](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/)

## Консультации
- [Telegram-чат TL Bootcamp](https://tlinks.run/tlbootcamp).
- DevOps - инженеры, разработчики в вашей компании, кто уже этим занимался.

## Теория
<!-- yaspeller ignore:start -->
### Книги
- [Джез Хамбл, Дэйвид Фарли Непрерывное развёртывание ПО. Автоматизация процессов сборки, тестирования и внедрения новых версий программ](https://www.livelib.ru/book/1000505317-nepreryvnoe-razvertyvanie-po-avtomatizatsiya-protsessov-sborki-testirovaniya-i-vnedreniya-novyh-versij-programm-dzhez-hambl)
- [Философия DevOps. Искусство управления IT](https://www.livelib.ru/book/1002458135-filosofiya-devops-iskusstvo-upravleniya-it-dzhennifer-devis) - лучше в оригинале
- [Continuous delivery. Практика непрерывных апдейтов](https://www.livelib.ru/book/1002620197-continuous-delivery-praktika-nepreryvnyh-apdejtov-eberhard-volf)

### Видео
- [Илья Климов — Ламповый CI/CD. Как и с чего начать](https://www.youtube.com/watch?v=CwU-OiS_PEQ)
- [Лучшие практики CI/CD с Kubernetes и GitLab (Дмитрий Столяров, Флант, HighLoad++ 2017)](https://www.youtube.com/watch?v=U7Zo_e28aQA)
- [DevOps-Projects](https://www.youtube.com/watch?v=8D46Pgbz0gg&list=PLxzKY3wu0_FJdJd3IKdiM4Om1hGo2Hsdt)
- [Инфраструктура для мобильной разработки](https://www.youtube.com/watch?v=RIEoH6yZtak)
- [Прагматичный CI/CD / Дмитрий Воронин](https://www.youtube.com/watch?v=k-PJugS-Ng8)


### Статьи
- [Феншуйная автоматизация CI & CD с помощью Jenkins и Jira](https://habr.com/ru/company/yamoney/blog/328092/)
- [CI/CD: принципы, внедрение, инструменты](https://medium.com/southbridge/ci-cd-%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF%D1%8B-%D0%B2%D0%BD%D0%B5%D0%B4%D1%80%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-f0626b9994c8)
- [What is CI/CD and how to setup your CI pipeline for mobile?](https://blog.codemagic.io/what-is-ci-and-how-to-setup-your-ci-pipeline/)
<!-- yaspeller ignore:end -->
