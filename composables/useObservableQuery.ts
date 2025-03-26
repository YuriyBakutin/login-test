import { liveQuery } from 'dexie'
import { useObservable } from '@vueuse/rxjs'
import type { Ref } from 'vue'

// Функция, обеспечивающая реактивное получение данных из базы.
// https://dexie.org/docs/liveQuery()
// https://vueuse.org/rxjs/useObservable/
export default <T>(query: () => Promise<T>): Readonly<Ref<T>> => {
  // Проблема в несовпадении описания типов для результата liveQuery()
  // и ожидаемого типа функции observableQuery().
  // По факту, типы совпадают.
  // Поэтому мы используем any и игнорируем ошибку eslint.
  // При этом тип запроса query в результат useObservable() передаётся правильно.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useObservable(liveQuery(query) as any) as Readonly<Ref<T>>
}
