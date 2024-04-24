export interface TodoItemInterface {
  id: number // In a real world project, it should use UUID instead
  title: string
  notes: string
  isCompleted: boolean
}
