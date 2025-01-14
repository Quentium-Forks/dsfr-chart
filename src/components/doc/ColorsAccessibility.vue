<template>
  <!-- COLORS -->
  <div class="part_container fr-mb-6w">
    <h2 id="colors">
      X. Les couleurs
    </h2>
    <h3 class="fr-mt-5w">
      Graphiques unicolores
    </h3>
    <p>
      Une représentation graphique n’a pas toujours besoin d’être colorée. Lorsqu’il n’est pas nécessaire de
      différencier les formes par des couleurs,
      on affichera les graphes avec la couleur par défaut du DSFR pour les graphes unicolores :
    </p>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #5C68E5"
      /> <span
        class="legende_dot"
        style="background-color: #5C68E5"
      />
    </div>
    <h3 class="fr-mt-5w">
      Graphiques catégoriels
    </h3>
    <p>
      Lorsque les formes du graphique doivent être différenciées par des couleurs mais que celles-ci ne sont pas
      porteuses de sens supplémentaire que la catégorisation,
      la palette catégorielle doit être utilisée :
    </p>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #5C68E5"
      /> <span
        class="legende_dot"
        style="background-color: #5C68E5"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #82B5F2"
      /> <span
        class="legende_dot"
        style="background-color: #699BD6"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #29598F"
      /> <span
        class="legende_dot"
        style="background-color: #4878B1"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #31A7AE"
      /> <span
        class="legende_dot"
        style="background-color: #00828A"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #81EEF5"
      /> <span
        class="legende_dot"
        style="background-color: #51C1C8"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #B478F1"
      /> <span
        class="legende_dot"
        style="background-color: #BC8AF2"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #CFB1F5"
      /> <span
        class="legende_dot"
        style="background-color: #CFB1F5"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #CECECE"
      /> <span
        class="legende_dot"
        style="background-color: #A4A4A4"
      />
    </div>
    <h3 class="fr-mt-5w">
      Graphiques séquentiels
    </h3>
    <h4>Palette séquentielle unicolore</h4>
    <p>
      Lorsque les formes du graphique doivent être différenciées par des couleurs et que ces couleurs
      matérialisent une gradation, une palette séquentielle doit être utilisée.
      Il en existe deux versions à utiliser en fonction du besoin, En fonction du nombre de catégories, on
      appliquera autant de valeurs de couleurs qu’il en existe dans un dégradé allant de la première couleur de
      cette échelle
    </p>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #DBDAFF"
      /> <span
        class="legende_dot"
        style="background-color: #B8B9FF"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #00005F"
      /> <span
        class="legende_dot"
        style="background-color: #3647CA"
      />
    </div>
    <h4 class="fr-mt-5w">
      Palette séquentielle divergente
    </h4>
    <p>
      Cette palette convient également pour matérialiser des échelles numériques mais qui intègrent des valeurs
      négatives, ou des plages comportant deux extrêmes avec une ligne de base au milieu.<br>
      Dans la mesure du possible, le nombre de catégories doit refléter cette divergence, à travers 3 ou 5
      catégories distinctes. <br>
      Dans le cas où le nombre de catégories devrait être supérieur à 5, on appliquera autant de valeurs de
      couleurs qu’il en existe dans un dégradé allant du vert vers le rouge en passant par le jaune.
      Un nombre impair doit toutefois être conservé pour marquer la valeur médiane.
    </p>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #298641"
      /> <span
        class="legende_dot"
        style="background-color: #298641"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #79D289"
      /> <span
        class="legende_dot"
        style="background-color: #449D57"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #EFB900"
      /> <span
        class="legende_dot"
        style="background-color: #AF8800"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #FFA373"
      /> <span
        class="legende_dot"
        style="background-color: #FFA373"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #E91719"
      /> <span
        class="legende_dot"
        style="background-color: #E16834"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="legende_dot"
        style="background-color: #B1B1B1"
      /> <span
        class="legende_dot"
        style="background-color: #808080"
      />
    </div>
  </div>

  <!-- Accessibilité -->
  <div class="part_container fr-mb-10w">
    <h2 id="accessibility">
      XI. Accessibilité
    </h2>
    <p>
      Pour permettre d'offrir une alternative à la visualisation des
      données et ainsi s'adapter tous les publics, il est possible
      d’accompagner les graphiques d’une présentation des résultats sous
      la forme de tableaux.
    </p>

    <div class="chart_container">
      <table-chart
        x="[&quot;A&quot;,&quot;B&quot;,&quot;C&quot;,&quot;D&quot;,&quot;E&quot;,&quot;F&quot;,&quot;G&quot;,&quot;H&quot;,&quot;I&quot;,&quot;J&quot;]"
        y="[[1000000, 50,40,39,49,40, 50,40,39,49],[30, 150,340,379,439,40, 50,40,39,49],[30, 150,340,379,439,40, 50,40,39,49],[30, 150,340,379,439,40, 50,40,39,49],[30, 150,340,379,439,40, 50,40,39,49],[30, 150,340,379,439,40, 50,40,39,49],[30, 150,340,379,439,40, 50,40,39,49],[30, 150,340,379,439,40, 50,40,39,49]]"
        varname="Jours"
      />
    </div>

    <section class="fr-accordion fr-mt-4w fr-mb-6w">
      <h3 class="fr-accordion__title">
        <button
          class="fr-accordion__btn"
          aria-expanded="false"
          aria-controls="accordion-23"
        >
          Extrait de code
        </button>
      </h3>
      <div
        id="accordion-23"
        class="fr-collapse"
      >
        <div class="code-toolbar">
          <pre>
            <code>
                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>table-chart</span>
                <span class="token attr-name">x</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">'</span><span class="titre_class">[["A","B","C","D","E","F","G","H","I","J"],
                ["A","B","C","D","E","F","G","H","I","J"]]</span><span class="token punctuation">'</span>
                </span><span class="token attr-name">y</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">'</span><span class="titre_class">[[40, 50,40,39,49,40, 50,40,39,49],
                [30, 150,340,379,439,40, 50,40,39,49],
                [30, 150,340,379,439,40, 50,40,39,49],
                [30, 150,340,379,439,40, 50,40,39,49],
                [30, 150,340,379,439,40, 50,40,39,49],
                [30, 150,340,379,439,40, 50,40,39,49],
                [30, 150,340,379,439,40, 50,40,39,49],
                [30, 150,340,379,439,40, 50,40,39,49]]</span><span class="token punctuation">'</span>
                <span class="token attr-name">varname</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">'</span><span class="titre_class">Jours</span><span class="token punctuation">'</span></span><span class="token punctuation">&gt;</span></span><span class="token punctuation">&lt;/</span>table-chart</span><span class="token punctuation">&gt;</span>
            </code>
        </pre>
        </div>
      </div>
    </section>
  </div>
</template>