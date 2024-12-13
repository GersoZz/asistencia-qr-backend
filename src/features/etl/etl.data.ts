import { ROLES } from 'src/utils/roles'
import SectionModel from '../info/models/Section.model'
import { ICourse } from './etl.interface'
import CourseModel from './models/Course.model'

export const createCourses = async (courses: ICourse[]): Promise<any> => {
  const createdCourses = await CourseModel.insertMany(courses)

  return createdCourses
}

export const getSectionsByUserId = async (userId: string, userRole: string): Promise<any> => {
  try {
    let sections: any[] = []

    if (userRole === ROLES.professor) {
      sections = await SectionModel.find({ professors: userId }).populate({
        path: 'id_course',
        select: 'name',
      })
    } else if (userRole === ROLES.student) {
      sections = await SectionModel.find({ students: userId }).populate({
        path: 'id_course',
        select: 'name',
      })
    }

    return sections.map((section: any) => ({
      sectionId: section._id,
      codSection: section.cod_section,
      classroom: section.classroom,
      courseName: section.id_course?.name,
    }))
  } catch (error) {
    console.error('Error fetching sections:', error)
    throw error
  }
}
