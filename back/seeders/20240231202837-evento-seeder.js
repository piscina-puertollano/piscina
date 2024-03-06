// Gonzalo Martinez Haro
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert(process.env.TABLE_EVENTOS, [{
        nombre: '24H',
        fecha: '12/05/2024',
        sede: 'Puertollano',
        idCategoria: 3,
        visible: true,
        privado: false,
        resultado: 5,
        desc: `¡Hola a todos los amantes de la natación! Hoy queremos hablaros sobre un evento muy emocionante que está a punto de tener lugar: la competición de natación 24 horas.

        Este evento único en su clase reunirá a nadadores de todo el país para competir en una maratón acuática que pondrá a prueba su resistencia y habilidades en el agua. Durante 24 horas seguidas, los participantes nadarán sin parar en una piscina olímpica, en equipos o individualmente, con el objetivo de completar la mayor cantidad de metros posibles.
        
        La competición de natación 24 horas es una oportunidad perfecta para poner a prueba tus límites, superarte a ti mismo y disfrutar de la compañía de otros apasionados de la natación. Además, es una forma divertida de recaudar fondos para organizaciones benéficas y causas solidarias, ya que los participantes pueden buscar patrocinadores que se comprometan a donar una cantidad de dinero por cada metro nadado.
        
        Durante el evento, habrá descansos programados para que los nadadores puedan recuperar fuerzas, alimentarse y reponer energías. También habrá actividades complementarias, como clases de yoga acuático, charlas sobre nutrición deportiva y sesiones de masaje para relajar los músculos cansados.
        
        La competición de natación 24 horas es una experiencia única que te permitirá vivir la emoción de la competición, la camaradería de compartir la piscina con otros nadadores y la satisfacción de superar un desafío físico y mental. ¡No te lo pierdas y únete a nosotros en este emocionante evento acuático!
        
        ¡Nos vemos en la piscina!`,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      nombre: 'Competición regional',
      fecha: '30/05/2024',
      sede: 'Puertollano',
      idCategoria: 1,
      visible: false,
      privado: true,
      //resultado: 5,
      desc: `¡Hola a todos los amantes de la natación en Puertollano! Hoy queremos compartir con ustedes toda la información sobre la emocionante competición regional que se llevará a cabo en nuestra ciudad.

      Este evento tan esperado reunirá a los mejores nadadores de la región, quienes competirán en diferentes categorías y modalidades. Desde los más jóvenes hasta los más experimentados, todos tendrán la oportunidad de demostrar su talento y habilidades en el agua.
      
      La competición se llevará a cabo en la piscina municipal de Puertollano, un lugar emblemático que ha sido testigo de grandes hazañas deportivas a lo largo de los años. Los espectadores podrán disfrutar de un ambiente vibrante y lleno de emoción, mientras animan a sus nadadores favoritos.
      
      Además de las pruebas individuales, también habrá competiciones por equipos, donde la estrategia y la coordinación serán clave para alcanzar la victoria. Los clubes de natación de la región se enfrentarán en intensas batallas acuáticas, demostrando su trabajo en equipo y su dedicación al deporte.
      
      Los ganadores de cada categoría recibirán trofeos y reconocimientos, pero lo más importante es el espíritu de camaradería y la pasión por la natación que se respirará en cada carrera. Todos los participantes se esforzarán al máximo para alcanzar sus metas y superar sus propios límites, en busca de la gloria deportiva.
      
      Así que no te pierdas esta emocionante competición regional de natación en Puertollano. Ven a apoyar a tus nadadores favoritos, disfruta del ambiente festivo y vive la emoción de la competición en cada brazada. ¡Nos vemos en la piscina!`,
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
    nombre: 'Competición provincial',
    fecha: '30/06/2024',
    sede: 'Ciudad Real',
    idCategoria: 1,
    visible: true,
    privado: true,
    //resultado: 5,
    desc: `¡Hola a todos los amantes de la natación en Puertollano! Hoy queremos compartir con ustedes toda la información sobre la emocionante competición regional que se llevará a cabo en nuestra ciudad.

    Este evento tan esperado reunirá a los mejores nadadores de la región, quienes competirán en diferentes categorías y modalidades. Desde los más jóvenes hasta los más experimentados, todos tendrán la oportunidad de demostrar su talento y habilidades en el agua.
    
    La competición se llevará a cabo en la piscina municipal de Puertollano, un lugar emblemático que ha sido testigo de grandes hazañas deportivas a lo largo de los años. Los espectadores podrán disfrutar de un ambiente vibrante y lleno de emoción, mientras animan a sus nadadores favoritos.
    
    Además de las pruebas individuales, también habrá competiciones por equipos, donde la estrategia y la coordinación serán clave para alcanzar la victoria. Los clubes de natación de la región se enfrentarán en intensas batallas acuáticas, demostrando su trabajo en equipo y su dedicación al deporte.
    
    Los ganadores de cada categoría recibirán trofeos y reconocimientos, pero lo más importante es el espíritu de camaradería y la pasión por la natación que se respirará en cada carrera. Todos los participantes se esforzarán al máximo para alcanzar sus metas y superar sus propios límites, en busca de la gloria deportiva.
    
    Así que no te pierdas esta emocionante competición regional de natación en Puertollano. Ven a apoyar a tus nadadores favoritos, disfruta del ambiente festivo y vive la emoción de la competición en cada brazada. ¡Nos vemos en la piscina!`,
    createdAt: new Date(),
    updatedAt: new Date()
 },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
