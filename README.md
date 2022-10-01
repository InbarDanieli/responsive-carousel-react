# responsive-carousel-react

Simple react carousel with mouse and touch support

## Install

```bash
npm install responsive-carousel-react
```

## Usage

```js
import { Carousel } from "responsive-carousel-react";
```

### Example

```js
import { Carousel } from "responsive-carousel-react";

function Example() {
  return (
    <Carousel>
      <div>item 1</div>
      <div>item 2</div>
      <div>item 3</div>
      <div>item 4</div>
      <div>item 5</div>
      <div>item 6</div>
    </Carousel>
  );
}
```

## API

| Property             | Type            | Default | Description                                                       |
| -------------------- | --------------- | ------- | ----------------------------------------------------------------- |
| maxGapItems          | number          | 24      | the maximum gap between each item in the carousel                 |
| minGapItems          | number          | 8       | the minimum gap between each item in the carousel                 |
| paddingBodyContainer | number          | 60      | the padding between the carousel container and the carousel items |
| swipeSensativity     | number          | 50      | the minimum finger travel to register as a swipe                  |
| title                | string          | ""      | the title of the carousel                                         |
| children             | react component | null    | the items that will be displayed in the carousel                  |
| carouselStyle        | object          | null    | styling for the carousel component                                |
| titleStyle           | object          | null    | styling for the carousel title                                    |
