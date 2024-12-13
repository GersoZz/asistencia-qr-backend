import { ICourse } from './info.interface'
import CourseModel from './models/Section.model'

export const createCourses = async (courses: ICourse[]): Promise<any> => {
  const createdCourses = await CourseModel.insertMany(courses)

  return createdCourses
}
