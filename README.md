## Description

Nest.js를 사용한 유적지 탐방 프로젝트의 API 서버 입니다.

## Installation for developer

```bash
$ git clone https://lab.hanium.or.kr/23_HI069/creepernetes-api-server.git
$ cd creepernetes-api-server
$ rm -rf ./.git
$ git init
```

깃 클론한 뒤에 ./.git 폴더를 삭제하고 다시 git init을 해주세요.

package.json의 name을 본인이 맡은 애플리케이션에 맡게 변경해주세요.

application과 repository 이름은 `<애플리케이션명>-api-server`으로 해주시기 바랍니다.

깃랩에서 repository를 만들고 안내하는 대로 연결하면 됩니다.

## 작업 브랜치 생성

`git checkout -b dev` 명령어로 `dev` 브랜치에서 작업해주세요.

기능이 생길 때마다, 혹은 회의 때 간단히 코드리뷰를 하고 main으로 merge 했으면 하는 .. 바람이 있어용

### 새로운 resource 생성

```
$ nest g res <resource 명>
```

nest cli를 설치한 상태에서 위 명령어를 입력하면 CRUD resource가 생성됩니다. 더 많은 명령어는 `nest -h`로 확인해주세요.

### 데이터베이스 의존성 주입

리소스의 엔티티 폴더에 DB 구조에 맞게 엔티티를 작성하면 typeOrm에서 해당 파일들을 읽어와 알아서 데이터베이스와 맵핑해줍니다. (typeORM은 [app.module.ts](src/app.module.ts)에서 의존성에 주입됩니다.)

이 엔티티를 사용하기 위해서는 원하는 서비스의 constructor에서 typeORM의 Repository 타입의 객체를 의존성으로 주입해야 합니다. [user.service.ts](src/user/user.service.ts)의 constructor를 참고해 주세요.

서비스에만 의존성을 주입하지 않고, 서비스와 컨트롤러를 합쳐서 전체 앱에 제공해주는 리소스 모듈에도 typeORM 의존성을 주입해야 합니다. [user.module.ts](src/user/user.module.ts)의 imports를 참고해 주세요.

service에서 repository 사용법은 [typeORM 공식문서](https://typeorm.io/)를 참고하시기 바랍니다.

### user resource 삭제

`src/user`
개발을 진행하면서 더 이상 `user` 모듈이 필요 없어지면 `src/user` 폴더 삭제 후, `app.module.ts`에서 `import`배열에 있는 `UserModule`를 제거해 의존성을 없애 주세요.

### 환경변수

`config/env/.env.example`를 참고하여 `config/env/.env.local`파일을 작성해 주세요. [app.module.ts](src/app.module.ts)에서 `config/env/.env.local`를 환경변수 파일로 참고하도록 했는데, 필요하다면 다른 파일도 참고하도록 해주세요.

### 패키지 다운로드

```bash
$ npm install
```

node.js 애플리케이션 실행을 위해 의존성을 다운로드 합니다.

## 앱 실행, 테스트

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

`npm run start`명령어의 경우 새로고침을 해도 변경사항이 바로 반영되지 않으니, `npm run start:dev`를 사용해 개발해주세요.

### client test

개발을 하면서 브라우저 상에서 테스트를 하고 싶다면 Postman(SaaS)이나, Talend API Tester(크롬 확장프로그램)를 추천합니다.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

test 코드는 각 모듈이 위치하는 폴더에 `*.spec.ts` 파일에 작성할 수 있습니다. 저도 제대로 작성해본적이 없어서 잘 모르겠네요.
