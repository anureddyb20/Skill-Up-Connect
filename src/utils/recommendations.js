/**
 * Recommendation Engine Logic
 * 
 * Logic:
 * 1. If skill score is < 50%, recommend relevant foundational courses.
 * 2. If skill score is > 80%, recommend advanced projects or certifications.
 * 3. Match jobs based on selected roles and experience level.
 */

export const getRecommendations = (userData, assessmentResults) => {
  const recommendations = {
    courses: [],
    jobs: [],
    nextSteps: []
  };

  // 1. Course Recommendations based on assessment
  if (assessmentResults) {
    Object.entries(assessmentResults.breakdown).forEach(([category, stats]) => {
      const score = (stats.correct / stats.total) * 100;
      
      if (score < 50) {
        recommendations.courses.push({
          id: `course-${category}`,
          title: `Foundations of ${category}`,
          category,
          reason: `Based on your ${category} score (${Math.round(score)}%)`,
          priority: 'High'
        });
      } else if (score < 80) {
        recommendations.courses.push({
          id: `course-${category}-adv`,
          title: `Advanced ${category} Strategies`,
          category,
          reason: `Level up your ${category} skills`,
          priority: 'Medium'
        });
      }
    });
  }

  // 2. Job Recommendations based on roles and experience
  const jobRoles = userData.roles || [];
  const expLevel = userData.experience || '0';

  if (jobRoles.includes('Technology')) {
    recommendations.jobs.push({
      title: 'Junior Web Developer',
      company: 'InnovateX',
      match: '95%',
      reason: 'Matches your Technology interest and assessment scores.'
    });
  }

  if (jobRoles.includes('Design & Creative')) {
    recommendations.jobs.push({
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      match: '88%',
      reason: 'Strong match for your Design skills.'
    });
  }

  // Default recommendations if none found
  if (recommendations.courses.length === 0) {
    recommendations.courses.push({
      title: 'Professional Productivity Masterclass',
      category: 'General',
      reason: 'Recommended for all high-performers.',
      priority: 'Low'
    });
  }

  return recommendations;
};
