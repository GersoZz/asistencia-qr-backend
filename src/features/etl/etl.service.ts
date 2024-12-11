import * as etlData from '@etl/etl.data'
import { ICourse } from './etl.interface'
import { toSlug } from 'src/utils/strings'

export const createCourses = async (courses: ICourse[]): Promise<any> => {
  const coursesWithSlugs = courses.map((course) => {
    return {
      ...course,
      slug: toSlug(course.name),
    }
  })

  const createdCourses = await etlData.createCourses(coursesWithSlugs)

  return createdCourses
}
