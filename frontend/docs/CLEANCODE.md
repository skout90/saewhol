# 클린코드

- https://github.com/738/clean-code-typescript

## 함수는 한가지만 해야한다.

함수가 한 가지 이상의 역할을 수행할 때 작성하고 테스트하고 추론하기 어려워집니다. 함수를 하나의 행동으로 정의할 수 있을 때, 쉽게 리팩토링할 수 있으며 코드를 더욱 명료하게 읽을 수 있습니다.

Bad:

```typescript
function emailClients(clients: Client[]) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client)
    if (clientRecord.isActive()) {
      email(client)
    }
  })
}
```

Good:

```typescript
function emailClients(clients: Client[]) {
  clients.filter(isActiveClient).forEach(email)
}

function isActiveClient(client: Client) {
  const clientRecord = database.lookup(client)
  return clientRecord.isActive()
}
```

## 클래스를 이용한 중복함수 제거

Bad:

```typescript
function showDeveloperList(developers: Developer[]) {
  developers.forEach((developer) => {
    const expectedSalary = developer.calculateExpectedSalary()
    const experience = developer.getExperience()
    const githubLink = developer.getGithubLink()

    const data = {
      expectedSalary,
      experience,
      githubLink,
    }

    render(data)
  })
}

function showManagerList(managers: Manager[]) {
  managers.forEach((manager) => {
    const expectedSalary = manager.calculateExpectedSalary()
    const experience = manager.getExperience()
    const portfolio = manager.getMBAProjects()

    const data = {
      expectedSalary,
      experience,
      portfolio,
    }

    render(data)
  })
}
```

Good:

```typescript
class Developer {
  // ...
  getExtraDetails() {
    return {
      githubLink: this.githubLink,
    }
  }
}

class Manager {
  // ...
  getExtraDetails() {
    return {
      portfolio: this.portfolio,
    }
  }
}

function showEmployeeList(employee: Developer | Manager) {
  employee.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary()
    const experience = employee.getExperience()
    const extra = employee.getExtraDetails()

    const data = {
      expectedSalary,
      experience,
      extra,
    }

    render(data)
  })
}
```

## 조건문을 캡슐화

Bad:

```typescript
if (subscription.isTrial || account.balance > 0) {
  // ...
}
```

Good:

```typescript
function canActivateService(subscription: Subscription, account: Account) {
  return subscription.isTrial || account.balance > 0;
}

if (canActivateService(subscription, account)) {
  // ...
```

## 불변성 선호

Bad:
```typescript
interface Config {
  host: string;
  port: string;
  db: string;
}
```

Good:
```typescript
interface Config {
  readonly host: string;
  readonly port: string;
  readonly db: string;
}
```

Bad:
```typescript
const array: number[] = [ 1, 3, 5 ];
array = []; // 에러
array.push(100); // 배열은 변경될 것입니다.
```

Good:
```typescript
const array: ReadonlyArray<number> = [ 1, 3, 5 ];
array = []; // 에러
array.push(100); // 에러
```

```typescript
function hoge(args: readonly string[]) {
  args.push(1); // 에러
}
```

```typescript
// 읽기 전용 객체
const config = {
  hello: 'world'
} as const;
config.hello = 'world'; // 에러

// 읽기 전용 배열
const array  = [ 1, 3, 5 ] as const;
array[0] = 10; // 에러

// 읽기 전용 객체를 반활할 수 있습니다
function readonlyData(value: number) {
  return { value } as const;
}

const result = readonlyData(100);
result.value = 200; // 에러
```

## 타입 vs 인터페이스

합집합 또는 교집합이 필요할 때 `타입` 사용. `extends` 또는 `implements`가 필요할때 인터페이스 사용

Bad:
```typescript
interface EmailConfig {
  // ...
}

interface DbConfig {
  // ...
}

interface Config {
  // ...
}

//...

type Shape = {
  // ...
}
```

Good:
```typescript
type EmailConfig = {
  // ...
}

type DbConfig = {
  // ...
}

type Config  = EmailConfig | DbConfig;

// ...

interface Shape {
  // ...
}

class Circle implements Shape {
  // ...
}

class Square implements Shape {
  // ...
}
```

## 메서드 체이닝 사용

Bad:
```typescript
class QueryBuilder {
  private collection: string;
  private pageNumber: number = 1;
  private itemsPerPage: number = 100;
  private orderByFields: string[] = [];

  from(collection: string): void {
    this.collection = collection;
  }

  page(number: number, itemsPerPage: number = 100): void {
    this.pageNumber = number;
    this.itemsPerPage = itemsPerPage;
  }

  orderBy(...fields: string[]): void {
    this.orderByFields = fields;
  }

  build(): Query {
    // ...
  }
}

// ...

const queryBuilder = new QueryBuilder();
queryBuilder.from('users');
queryBuilder.page(1, 100);
queryBuilder.orderBy('firstName', 'lastName');

const query = queryBuilder.build();
```

Good:
```typescript
class QueryBuilder {
  private collection: string;
  private pageNumber: number = 1;
  private itemsPerPage: number = 100;
  private orderByFields: string[] = [];

  from(collection: string): this {
    this.collection = collection;
    return this;
  }

  page(number: number, itemsPerPage: number = 100): this {
    this.pageNumber = number;
    this.itemsPerPage = itemsPerPage;
    return this;
  }

  orderBy(...fields: string[]): this {
    this.orderByFields = fields;
    return this;
  }

  build(): Query {
    // ...
  }
}

// ...

const query = new QueryBuilder()
  .from('users')
  .page(1, 100)
  .orderBy('firstName', 'lastName')
  .build();
```