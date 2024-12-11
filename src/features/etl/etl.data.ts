import { ICourse } from './etl.interface'
import CourseModel from './models/Course.model'

export const createCourses = async (courses: ICourse[]): Promise<any> => {
  const createdCourses = await CourseModel.insertMany(courses)

  return createdCourses
}
