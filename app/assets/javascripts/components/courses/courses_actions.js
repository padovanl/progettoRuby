export const fetchCourses = (page) => {
    return $.ajax({
        method: 'GET',
        url: '/courses',
        data: { page },
    });
};