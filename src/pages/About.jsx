import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMedal, FaRocket, FaTrophy, FaUsers, FaGlobeAfrica, FaStar, FaHandshake, FaShieldAlt, FaLightbulb, FaHeart } from 'react-icons/fa';
import Seo from '../components/common/Seo';
import SectionTitle from '../components/common/SectionTitle';
import StaffCard from '../components/cards/StaffCard';
import api from '../services/api';

const milestones = [
  {
    year: '2011',
    title: 'Foundation of Excellence',
    description: 'Esperance FC Academy was founded with a bold vision: to create a world-class sports institution in Africa. Starting with just 30 students and a single football program, the academy laid its cornerstone on the principles of discipline, integrity, and sporting excellence.',
    icon: FaStar,
    stats: '30 Students · 1 Sport · 3 Coaches',
  },
  {
    year: '2014',
    title: 'Multi-Sport Expansion',
    description: 'Recognizing the demand for diverse athletic development, the academy expanded beyond football. Basketball, volleyball, and table tennis programs were launched, attracting talented athletes from across the region and establishing Esperance FC as a comprehensive sports academy.',
    icon: FaRocket,
    stats: '150+ Students · 4 Sports · 12 Coaches',
  },
  {
    year: '2017',
    title: 'Regional Recognition',
    description: 'Esperance FC athletes began making their mark on the regional stage, earning medals in national competitions and inter-academy tournaments. The academy\'s reputation for producing well-rounded, competitive athletes led to partnerships with schools and sports organizations.',
    icon: FaTrophy,
    stats: '400+ Students · 15+ Competition Medals',
  },
  {
    year: '2020',
    title: 'Women\'s Football & German Classes',
    description: 'Breaking new ground, the academy launched its Women\'s Football program to promote gender equality in sports. Simultaneously, German Language Classes were introduced, combining athletic training with academic enrichment to prepare students for international opportunities.',
    icon: FaUsers,
    stats: '600+ Students · 6 Programs · 25+ Staff',
  },
  {
    year: '2023',
    title: 'International Partnerships',
    description: 'The academy forged international partnerships with European sports institutions, creating exchange programs and scouting opportunities for talented athletes. Esperance FC graduates began securing scholarships and professional contracts abroad, fulfilling the academy\'s promise of global pathways.',
    icon: FaGlobeAfrica,
    stats: '800+ Students · International Exchanges · Scholarships',
  },
  {
    year: '2026',
    title: 'Leading African Sports Academy',
    description: 'Today, Esperance FC Academy stands as a premier sports institution in Africa, serving over 1,000 students across six programs. With state-of-the-art facilities, world-class coaching staff, and a holistic approach to athlete development, the academy continues to shape the future of sports on the continent.',
    icon: FaMedal,
    stats: '1,000+ Students · 6 Programs · 40+ Coaches',
  },
];

const coreValues = [
  {
    icon: FaMedal,
    title: 'Excellence',
    description: 'We pursue the highest standards in every aspect of our academy — from coaching methodology to facility quality. Our relentless commitment to excellence drives continuous improvement and pushes every athlete to reach their full potential.',
    color: '#D4AF37',
  },
  {
    icon: FaShieldAlt,
    title: 'Discipline',
    description: 'Discipline is the foundation of all achievement. We instill in our athletes the self-control, focus, and work ethic required to excel in sports and life. Structure, consistency, and accountability are non-negotiable pillars of our program.',
    color: '#111111',
  },
  {
    icon: FaUsers,
    title: 'Teamwork',
    description: 'We believe that collective effort produces extraordinary results. Our academy fosters a culture where collaboration, mutual support, and shared goals drive success. Every individual contributes to something greater than themselves.',
    color: '#D4AF37',
  },
  {
    icon: FaLightbulb,
    title: 'Leadership',
    description: 'We develop leaders who inspire others through action and character. Our athletes learn to take initiative, make decisions under pressure, and lead by example — skills that serve them long after their sporting careers.',
    color: '#111111',
  },
  {
    icon: FaHandshake,
    title: 'Integrity',
    description: 'Honesty, transparency, and moral courage guide everything we do. We build character through ethical conduct, teaching our athletes that true success is measured not just by victories, but by the respect they earn from others.',
    color: '#D4AF37',
  },
  {
    icon: FaHeart,
    title: 'Respect',
    description: 'We foster an environment of mutual respect — for teammates, opponents, coaches, and the game itself. Our academy celebrates diversity, promotes inclusion, and teaches athletes to treat everyone with dignity.',
    color: '#111111',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7 },
};

const About = () => {
  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const { data } = await api.get('/staff');
        if (data.success) {
          setStaffMembers(data.data.staff.map(member => ({
            id: member._id,
            name: member.name,
            position: member.position,
            description: member.biography || member.description || '',
            image: member.photo || member.image || null,
          })));
        }
      } catch (err) {
        console.error('Unable to load leadership team', err);
      }
    };
    fetchStaff();
  }, []);

  const leadershipTeam = staffMembers;

  return (
    <div className="overflow-hidden">
      <Seo path="/about" />
      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.16),_transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.05),_transparent_30%)]" />
        <div className="absolute top-8 left-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-accent border border-accent/30 bg-accent/10 mb-6">
                About Esperance FC
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Building Champions Through Character
                <span className="block text-accent">and Community Impact</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
                Esperance FC Academy blends elite coaching, academic support, and life skills training so young athletes thrive on and off the field.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-primary shadow-lg shadow-accent/20 transition-all duration-300 hover:-translate-y-1"
                >
                  Contact Us
                </Link>
                <Link
                  to="/football-academy/football"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
                >
                  Explore Programs
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/5 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/10 shadow-[0_30px_90px_rgba(0,0,0,0.3)] backdrop-blur-sm">
                <div className="grid gap-4 p-6 sm:p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                      <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">Established</span>
                      <p className="mt-4 text-3xl font-bold text-white">2011</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                      <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">Programs</span>
                      <p className="mt-4 text-3xl font-bold text-white">6+</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                      <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">Students</span>
                      <p className="mt-4 text-3xl font-bold text-white">1,000+</p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                      <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">Awards</span>
                      <p className="mt-4 text-3xl font-bold text-white">Regional</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                      <h3 className="text-base font-semibold text-white">Athlete Development</h3>
                      <p className="mt-3 text-sm text-gray-200 leading-relaxed">
                        Technical training, mental resilience, and leadership are built into every academy pathway.
                      </p>
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                      <h3 className="text-base font-semibold text-white">Academic Support</h3>
                      <p className="mt-3 text-sm text-gray-200 leading-relaxed">
                        Focused mentoring and classroom support help students balance sport and study.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academy Story */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Academy Story"
            subtitle="From humble beginnings to a premier sports academy, our story is built on passion, progress, and purpose."
          />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgba(17,17,17,0.06)] border border-gray-100">
              <div className="w-16 h-16 mb-6 rounded-3xl flex items-center justify-center bg-accent/10 text-accent">
                <FaStar className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Humble Beginnings</h3>
              <p className="text-gray-600 leading-relaxed">
                Esperance FC Academy started in 2011 with a small group of committed athletes and a bold vision to create a world-class sports home in Africa.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgba(17,17,17,0.06)] border border-gray-100">
              <div className="w-16 h-16 mb-6 rounded-3xl flex items-center justify-center bg-accent/10 text-accent">
                <FaUsers className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Community Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                We grew through strong community partnerships, expanded our programs, and built a supportive environment where athletes thrive academically and athletically.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgba(17,17,17,0.06)] border border-gray-100">
              <div className="w-16 h-16 mb-6 rounded-3xl flex items-center justify-center bg-accent/10 text-accent">
                <FaHeart className="text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Future Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                Today we combine elite coaching with character development, preparing young athletes for success in sport, education, and life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey - Vertical Timeline */}
      <section className="py-24 bg-white relative">
        {/* Decorative background */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-20">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">Our Story</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              Our Journey
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto" />
            <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto">
              A decade and a half of growth, milestones, and unwavering dedication to sporting excellence
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-px">
              <div className="h-full w-full bg-gradient-to-b from-accent via-primary/30 to-accent/20" />
            </div>

            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0;
              const Icon = milestone.icon;

              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`relative flex items-start gap-6 md:gap-0 mb-16 md:mb-24 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline Dot - Center on desktop, left on mobile */}
                  <div className="relative z-10 shrink-0 w-[60px] md:w-1/2 flex md:justify-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl border-4 border-white ${index === milestones.length - 1 ? 'bg-accent' : 'bg-primary'}`}>
                      <Icon className={`text-lg ${index === milestones.length - 1 ? 'text-primary' : 'text-accent'}`} />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(17,17,17,0.08)] border border-gray-100 hover:shadow-[0_12px_40px_rgba(17,17,17,0.12)] transition-all duration-500"
                    >
                      {/* Year Badge */}
                      <span className={`inline-block px-4 py-1.5 rounded-lg text-sm font-bold mb-4 ${index === milestones.length - 1 ? 'bg-accent/15 text-accent' : 'bg-primary/5 text-primary'}`}>
                        {milestone.year}
                      </span>

                      <h3 className="text-xl md:text-2xl font-bold text-primary mb-3">
                        {milestone.title}
                      </h3>

                      <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">
                        {milestone.description}
                      </p>

                      {/* Stats Badge */}
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${index === milestones.length - 1 ? 'bg-accent/10 text-accent' : 'bg-primary/5 text-primary/70'}`}>
                        <FaTrophy className="text-xs" />
                        {milestone.stats}
                      </div>
                    </motion.div>

                    {/* Desktop decorative line connecting dot to card */}
                    <div className={`hidden md:block absolute top-7 w-8 h-0.5 bg-gradient-to-r ${isLeft ? 'right-1/2 from-transparent to-accent/30' : 'left-1/2 from-accent/30 to-transparent'}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision Strip */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10"
            >
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                <FaRocket className="text-2xl text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To nurture and develop young athletes by providing exceptional sports training, fostering character growth, 
                and creating opportunities for success both on and off the field. We are committed to building not just 
                skilled athletes, but well-rounded individuals who contribute positively to society.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10"
            >
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                <FaGlobeAfrica className="text-2xl text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To be the leading sports academy in Africa, recognized for producing champions who excel in sports, 
                academics, and life. We envision a future where every young athlete has access to world-class training 
                and the opportunity to reach their full potential.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">Our Foundation</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
              Our Values
            </h2>
            <div className="w-20 h-0.5 bg-accent mx-auto" />
            <p className="text-gray-500 text-lg mt-6 max-w-2xl mx-auto">
              Six core principles that define our culture and guide every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-[0_4px_20px_rgba(17,17,17,0.06)] hover:shadow-[0_20px_60px_rgba(17,17,17,0.12)] transition-all duration-500 cursor-default border border-gray-100"
                >
                  {/* Hover accent bar */}
                  <div
                    className="absolute top-0 left-6 right-6 h-1 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ backgroundColor: value.color }}
                  />

                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      backgroundColor: `${value.color}12`,
                      color: value.color,
                    }}
                  >
                    <Icon className="text-3xl" />
                  </div>

                  {/* Number */}
                  <span
                    className="absolute top-6 right-6 text-5xl font-bold opacity-5 select-none"
                    style={{ color: value.color }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {value.description}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                    style={{ backgroundColor: `${value.color}30` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      {leadershipTeam.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Leadership Team"
              subtitle="Experienced professionals committed to your success"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
              {leadershipTeam.map((member, index) => (
                <StaffCard key={member.id || index} member={member} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Strip */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Be Part of Our Story?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join Esperance FC Academy and embark on a journey of sporting excellence, character development, and lifelong achievement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-light transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Us Today
            </Link>
            <Link
              to="/football-academy/football"
              className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/30 backdrop-blur-sm transform hover:-translate-y-1"
            >
              Explore Programs
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;